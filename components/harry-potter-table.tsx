
import { IHarryPotterName } from "@/data/harry-potter.models";

function HarryPotterTable ({ names }: { names: IHarryPotterName[]}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Names</th>
        </tr>
      </thead>
      <tbody>
        {names.map((character, index) => (
          <tr key={`${character.id}-${character.name}`}>
            <td>{character.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default HarryPotterTable;