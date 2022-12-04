import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { getPage } from "../api";
import { transform } from "../util/transform-layout";
import { Image, Weather, Button } from "../includes/components";


const App = () => {
    const { id } = useParams<{ id: string }>();
    const [ layouts, setLayouts ] = useState<any[]>();
    const [ error, setError ] = useState();

    // if the ID param changes, it will render the new data automatically
    useEffect(() => {
        getPageInfo();
    },[ id ])

    async function getPageInfo(){
        try {
            let { data } = await getPage(id);
            setLayouts(transform(data));
        }
        catch(error) {
            setError(error.message);
        }
    }
    return (
        <div className="main-wrapper">
            {
                layouts ?
                layouts.map((layout: any) => {
                    return layout.components.map((component: any) => {
                        if (component.type == "image") {
                            return <Image key={component.id} data={component} />
                        } else if (component.type == "weather") {
                            return <Weather key={component.id} data={component} />
                        } else if (component.type == "button") {
                            return <Button key={component.id} data={component} />
                        } else {
                            return;
                        }
                    })
                })
                :
                <p>Loading screen</p>
            }
        </div>
    );
};

export default App;
