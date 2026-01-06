import React from "react";
import { Vanta } from "vanta-react";

export default function VantaWavesBackground() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <Vanta
                effect="waves"
                background={false}
                options={{
                    backgroundAlpha: 0,
                    color: 0x0,
                    shininess: 30,
                    waveHeight: 15,
                    waveSpeed: 1,
                    zoom: 1,
                    mouseControls: false,
                    touchControls: false,
                    gyroControls: false,
                }}
            />
        </div>
    );
}

