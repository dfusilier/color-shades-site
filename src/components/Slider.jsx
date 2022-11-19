import styled from "styled-components";
import * as RadixSlider from '@radix-ui/react-slider';

const Slider = { ...RadixSlider };

Slider.Root = styled(RadixSlider.Root)`
  position: relative;
  display: flex;
  align-items: center;
  user-select: none;
  touch-action: none;

  &[data-orientation='horizontal'] {
    width: 100%;
    height: 24px;
  }
`
Slider.Track = styled(RadixSlider.Track).attrs(props => ({
    style: { background: props.background || "var(--color-bg)" }
}))`
  border: 3px solid var(--color-fg);
  position: relative;
  flex-grow: 1;
  border-radius: 9999px;
  &[data-orientation='horizontal'] {
    height: 24px;
  }
`
Slider.Thumb = styled(RadixSlider.Thumb)`
  border: 3px solid var(--color-fg);
  background: var(--color-bg);
  display: block;
  width: 25px;
  height: 25px;
  // box-shadow: 0 2px 10px var(--blackA7);
  border-radius: 9999px;
`

export default Slider;