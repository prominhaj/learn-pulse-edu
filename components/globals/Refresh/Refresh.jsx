import { revalidatePathAction } from "@/app/actions";
import Btn from "./Btn";

const Refresh = () => {
    return (
        <form action={revalidatePathAction}>
            <Btn />
        </form>
    );
};

export default Refresh;