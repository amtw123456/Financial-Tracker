import { data } from "./doubleDonutdata";
import { SunburstChart } from './sunburstChart'; // Correct casing

export default function Analytics() {
    return (
        <main>Analytics Page
            <SunburstChart data={data} width={800} height={800} />
        </main>
    );
}
