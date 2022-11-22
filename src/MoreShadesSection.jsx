import React from 'react';
import styled from "styled-components";
import Color from 'colorjs.io';

// Utils
import useQueryParams from './utils/useQueryParams';
import suggestShades from './utils/suggestShades';
import createInterpolants from './utils/createInterpolants';
import shadeToContrast from './utils/shadeToContrast';
import { uniq } from 'lodash';

// Components
import Section from './components/Section';
import Box from './components/Box';
import Button from './components/Button';
import Tooltip from './components/Tooltip';
import Palette from './components/Palette';
import Tabs from './components/Tabs';
import ColorCoordForm from './ColorCoordForm';
import Dialog from './components/Dialog';
import EditShadesDialog from './EditShadesDialog';
import { SwatchIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';


const MoreShadesSection = ({ colorObj, shade }) => {
  let [queryParams, setQueryParams] = useQueryParams();

  const shades = queryParams.shades 
    ? queryParams.shades.split('-').map(thisShade => parseInt(thisShade))
    : uniq([10, 25, 50, 75, 100, 125, 150, 175, shade]).sort((a, b) => a - b);
  
  const { setLightness } = createInterpolants(
    colorObj,
    queryParams.hStart,
    queryParams.hEnd,
    queryParams.sStart,
    queryParams.sEnd,
  );

  const getShadeColors = shades => {
    return suggestShades({
      manipulation: change => setLightness(change),
      targets: shades.map(shade => shadeToContrast(shade))
    }).map(shade => shade.to("srgb"));
  }

  const shadeColors = getShadeColors(shades);
 
  return (
    <Section>
      <Box bg={"#161616"}>
        <Box.Column>

          <Box.Cell className="flex-column gap-0">
            <div className="flex-row flex-gap-1 flex-align-center">
              <h2 className="type-size-4 flex-fill-x">More shades</h2>
              <div className="flex-fit-x flex-row gap-0" style={{ marginInlineEnd: "-0.5rem"}}>
                <Dialog.Root>
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Dialog.Trigger asChild>
                          <Button prominence="secondary" icon>
                            <SwatchIcon className="h-2 w-2"/>
                          </Button>
                        </Dialog.Trigger>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content className="TooltipContent" sideOffset={6}>
                          Add to library
                          <Tooltip.Arrow className="TooltipArrow" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  <Dialog.Portal>
                    <Dialog.Overlay 
                      bg={new Color(
                        "srgb",
                        getShadeColors([10])[0].coords,
                        0.96
                      ).to("srgb").toString() 
                        
                    } />
                    <Dialog.Content>
                      <EditShadesDialog 
                        shade={shade}
                        shades={shades} 
                        getShadeColors={getShadeColors}
                        onSave={shades => setQueryParams({
                          ...queryParams,
                          color: colorObj.toString({ format: "hex" }),
                          shades: shades.join("-")
                        })}
                      />
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Button prominence="secondary" icon>
                          <DocumentDuplicateIcon className="h-2 w-2" />
                        </Button>
                      </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="TooltipContent" sideOffset={6}>
                        Copy values
                        <Tooltip.Arrow className="TooltipArrow" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              </div>
            </div>
          </Box.Cell>

          <PaletteAndTabs>
            <Palette>
              {shades.map((thisShade, i) => (
                <Palette.Shade bg={shadeColors[i].toString({ format: "hex" })} key={i}>
                  <div>
                    {thisShade === shade
                      ? `${shades[i]} ★`
                      : shades[i]
                    }
                  </div>
                  <div>{shadeColors[i].toString({ format: "hex" })}</div>
                </Palette.Shade>
              ))}
            </Palette>

            <Tabs.Root className="TabsRoot" defaultValue="saturation">
              <Tabs.List className="TabsList" aria-label="Edit palette">
                <Tabs.Trigger className="TabsTrigger" value="hue">
                  Hue
                </Tabs.Trigger>
                <Tabs.Trigger className="TabsTrigger" value="saturation">
                  Sat
                </Tabs.Trigger>
              </Tabs.List>

                <Tabs.Content className="TabsContent" value="hue" >
                  <ColorCoordForm coordType={"hue"} color={colorObj} />
                </Tabs.Content>
                <Tabs.Content className="TabsContent" value="saturation" >
                  <ColorCoordForm coordType={"saturation"} color={colorObj} />
                </Tabs.Content>
            </Tabs.Root>

          </PaletteAndTabs>
        </Box.Column>
      </Box>
    </Section>
  );
}

export default MoreShadesSection;

const PaletteAndTabs = styled(Box.Row)`
  display: grid;
  grid-template-columns: 3fr 2fr;
  min-height: 77vh;
  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
  }
`