import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getPage } from "../api";
import { transform } from "../util/transform-layout";
import { Image, Weather, Button, Condition } from "../includes/components";


const App = () => {
    const { id } = useParams<{ id: string }>();
    const [ layouts, setLayouts ] = useState<any[]>();
    const [ variables, setVariables ] = useState<any[]>([]);
    const [ error, setError ] = useState();

    // if the ID param changes, it will render the new data automatically
    useEffect(() => {
        getPageInfo();
    },[ id ])

    async function getPageInfo(){
        try {
            let { data } = await getPage(id);
            setLayouts(transform(data));
            if (data.variables) {
                setVariables(data.variables);
            }
        }
        catch(error) {
            setError(error.response.data.error);
        }
    }

    async function changeVariable(name: string, value: string){
        let new_variables = [...variables];
        let index = new_variables.findIndex(e => e.name === name);
        if (index >= 0) {
            new_variables[index].initialValue = value;
            setVariables(new_variables);
        }
    }

    return (
        <div className="main-wrapper">
            {
                error ?
                <p className="error-message">{error}</p>
                :
                null
            }
            {
                layouts ?
                layouts.map((layout: any) => {
                    return (
                        <Condition key={layout.id} conditions={layout.conditions} variables={variables}>
                            {
                                layout.components.map((component: any) => {
                                    if (component.type === "image") {
                                        return <Image key={component.id} data={component} />
                                    } else if (component.type === "weather") {
                                        return <Weather key={component.id} data={component} />
                                    } else if (component.type === "button") {
                                        return <Button key={component.id} data={component} changeVariable={changeVariable} />
                                    } else {
                                        return;
                                    }
                                })
                            }
                        </Condition>
                    )
                })
                :
                null
            }
        </div>
    );
};


export default App;


