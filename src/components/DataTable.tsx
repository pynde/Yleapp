import { Table } from "@radix-ui/themes";
import { FC, useEffect, useState } from "react";

interface SelectProps {

}

interface ForeignData {
    dimension: {
        Vuosi: {
            category: {
                index: {
                   [key:string] : number
                },
                label: string
            },
        },
        Alue: {
            category: {
                index: {
                   [key:string] : number
                },
                label: string
            },
        },
        Ikä: {
            category: {
                index: {
                   [key:string] : number
                },
                label: string
            },
        }
    },
    value: number[]
}

type FormattedData = {
    Alue: {
        label: string,
        amountOfChildren: number,
        maakunta: string
    }
}

const DataTable : FC<SelectProps> = () => {
    const [data, setData] = useState<FormattedData[]>([]);
    const [activeRow, setActiveRow] = useState("MK01 Uusimaa");
      
    useEffect(() => {
        const fetchData = async () => {
          const foreignData = await fetch("https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaka/statfin_vaka_pxt_14jt.px", {
            method: "POST",
            body: JSON.stringify({
                "query": [
                  {
                    "code": "Vuosi",
                    "selection": {
                      "filter": "item",
                      "values": [
                        "2022"
                      ]
                    }
                  },
                  {
                    "code": "Alue",
                    "selection": {
                      "filter": "agg:_Maakunnat ja kunnat 2022.agg",
                      "values": [
                        "MK01",
                        "KU018",
                        "KU049",
                        "KU078",
                        "KU091",
                        "KU106",
                        "KU149",
                        "KU186",
                        "KU224",
                        "KU235",
                        "KU245",
                        "KU257",
                        "KU407",
                        "KU444",
                        "KU434",
                        "KU504",
                        "KU505",
                        "KU543",
                        "KU611",
                        "KU638",
                        "KU616",
                        "KU710",
                        "KU753",
                        "KU755",
                        "KU858",
                        "KU092",
                        "KU927",
                        "MK02",
                        "KU019",
                        "KU202",
                        "KU322",
                        "KU284",
                        "KU304",
                        "KU400",
                        "KU423",
                        "KU430",
                        "KU480",
                        "KU481",
                        "KU503",
                        "KU529",
                        "KU538",
                        "KU561",
                        "KU577",
                        "KU445",
                        "KU631",
                        "KU636",
                        "KU680",
                        "KU704",
                        "KU734",
                        "KU738",
                        "KU761",
                        "KU833",
                        "KU853",
                        "KU895",
                        "KU918"
                      ]
                    }
                  },
                  {
                    "code": "Ikä",
                    "selection": {
                      "filter": "item",
                      "values": [
                        "3",
                        "4",
                        "5"
                      ]
                    }
                  },
                  {
                    "code": "Tiedot",
                    "selection": {
                      "filter": "item",
                      "values": [
                        "vaka_lapsi_lkm"
                      ]
                    }
                  }
                ],
                "response": {
                  "format": "json-stat2"
                }
              })
          })
          const json = await foreignData.json() as ForeignData;
          const ages = Object.entries(json.dimension.Ikä.category.label);
          const tempArray : FormattedData[] = [];
          let tempMaakunta = '';
          let sum = 0;
          let index = 0;
          // Loop through all maakunta from the response and reformat data for easier use
          for(const value of Object.values(json.dimension.Alue.category.label)) {
            ages.forEach(age => {
              
                if(!(isNaN(parseInt(age[0])))) {
                    sum += json.value[index];
                    index++;
                }
            })
            const prefix = value.slice(0, 2);
            if(prefix === "MK") { 
                tempMaakunta = value;
            }
            tempArray.push({
                Alue: {
                    label: value,
                    amountOfChildren: sum,
                    maakunta: tempMaakunta
                }
            })
            sum = 0;
          }
          setData(tempArray)
        }
        fetchData();
    }, []);

    /** Sets the active row state to toggle visibility of data */
    const handleClick = (dataItem: FormattedData) => {
        const prefix = dataItem.Alue.label.slice(0, 2);
        console.log(prefix)
        if(prefix === "MK") {
           setActiveRow(dataItem.Alue.maakunta); 
        }
        else {
            return
        }
    }

    return <>
    <Table.Root>
	    <Table.Header>
		<Table.Row>
                <Table.ColumnHeaderCell>Alue</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>3-6-vuotiaiden vieraskielisten lasten lukumäärä</Table.ColumnHeaderCell>
		</Table.Row>
	    </Table.Header>
	    <Table.Body>
            { data.map(item => {
                    return(
                    <Table.Row onClick={() => handleClick(item)} style={activeRow === item.Alue.maakunta ? { backgroundColor: "rgba(50, 100, 100, 0.1)"} : {}}>
                    <Table.RowHeaderCell >{item.Alue.label}</Table.RowHeaderCell>
                    <Table.Cell>{item.Alue.amountOfChildren}</Table.Cell>
                    </Table.Row>
                    )
            }) }
	    </Table.Body>
</Table.Root>

    </>
}

export default DataTable;