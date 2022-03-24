import WebHeader from "./webHeader";
import MobileHeader from "./mobileHeader";
import { isMobileScreen } from "../../utils";
import { useEffect, useState } from "react";

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => {
    const [zipCode, setZipCode] = useState<string>('');

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetch('https://ipapi.co/json/')
                .then(response => response.json())
                .then(data => setZipCode(data.postal))
                .catch(error => console.log(error));
        }

        return () => { isMounted = false };
    }, [])

    return (
        !isMobileScreen() ? (
            <WebHeader zipCode={zipCode} />
        ) : (
            <MobileHeader windowWidth={windowWidth} zipCode={zipCode} />
        )
    )
}