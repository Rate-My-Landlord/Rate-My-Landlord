import WebHeader from "./webHeader";
import MobileHeader from "./mobileHeader";
import { isMobileScreen } from "../../utils";

type Props = {
    windowWidth: number
}

export default ({ windowWidth }: Props) => (
    !isMobileScreen() ? (
        <WebHeader windowWidth={windowWidth} />
    ) : (
        <MobileHeader windowWidth={windowWidth} />
    )
)