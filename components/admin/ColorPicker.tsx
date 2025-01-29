import { HexColorInput, HexColorPicker } from "react-colorful";
import { useState } from "react";

interface ColorPickerProps {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: ColorPickerProps) => {
  const [color, setColor] = useState("#25388c");
  const [isOpen, setIsOpen] = useState(false);

  const handleColorChange = (newColor: string) => {
    setColor(newColor); // Update local state
    onPickerChange(newColor); // Notify parent of the change
  };

  return (
    <div className="color-picker">
      <div className="flex flex-row items-center self-start">
        <div
          className="mr-2 h-4 w-4 cursor-pointer rounded-[2px]"
          style={{ backgroundColor: color }}
          onClick={() => setIsOpen(!isOpen)}
        />
        <span>#</span>
        <HexColorInput
          color={color}
          onChange={handleColorChange}
          className="hex-input"
        />
      </div>
      {isOpen && <HexColorPicker color={color} onChange={handleColorChange} />}
    </div>
  );
};

export default ColorPicker;
