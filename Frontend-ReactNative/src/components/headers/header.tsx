import WebHeader from "./webHeader";
import MobileHeader from "./mobileHeader";
import { isMobileScreen } from "../../utils";
import { useEffect, useState } from "react";

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => (
    !isMobileScreen(windowWidth) ? (
        <WebHeader />
    ) : (
        <MobileHeader windowWidth={windowWidth} />
    )
)