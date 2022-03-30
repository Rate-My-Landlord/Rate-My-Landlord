import WebHeader from "./webHeader";
import MobileHeader from "./mobileHeader";
import { isMobileScreen } from "../../utils";

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => (
    !isMobileScreen(windowWidth) ? (
        <WebHeader />
    ) : (
        <MobileHeader />
    )
)