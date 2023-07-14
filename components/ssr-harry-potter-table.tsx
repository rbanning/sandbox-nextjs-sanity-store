import { store } from "@/store";
import HarryPotterTable from "./harry-potter-table";

function SSRHarryPotterTable() {
  return (
    <div>
      <HarryPotterTable names={store.getState().harryPotterSearch.startupNames} />
    </div>
  )
}

export default SSRHarryPotterTable;