import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image,
  Code,
  Quote,
} from "lucide-react";

const TextEditorToolbar: React.FC = () => {
  const [activeButtons, setActiveButtons] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
    align: "left" | "center" | "right" | "justify";
  }>({
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });

  const toggleButton = (name: string) => {
    if (
      name === "align-left" ||
      name === "align-center" ||
      name === "align-right" ||
      name === "align-justify"
    ) {
      setActiveButtons((prev) => ({
        ...prev,
        align: name.replace("align-", "") as
          | "left"
          | "center"
          | "right"
          | "justify",
      }));
    } else {
      setActiveButtons((prev) => ({
        ...prev,
        [name]: !prev[name as keyof typeof prev],
      }));
    }
  };

  const isActive = (name: string) => {
    if (name === "align-left") return activeButtons.align === "left";
    if (name === "align-center") return activeButtons.align === "center";
    if (name === "align-right") return activeButtons.align === "right";
    if (name === "align-justify") return activeButtons.align === "justify";
    return activeButtons[name as keyof typeof activeButtons] ?? false;
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="flex flex-wrap items-center p-1 gap-1">
        {/* Text style group */}
        <ToolbarGroup>
          <ToolbarButton
            title="Bold"
            active={isActive("bold") && true}
            onClick={() => toggleButton("bold")}
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={isActive("italic") && true}
            onClick={() => toggleButton("italic")}
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            active={isActive("underline") && true}
            onClick={() => toggleButton("underline")}
          >
            <Underline size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Alignment group */}
        <ToolbarGroup>
          <ToolbarButton
            title="Align Left"
            active={isActive("align-left") && true}
            onClick={() => toggleButton("align-left")}
          >
            <AlignLeft size={18} />
          </ToolbarButton>
          <ToolbarButton
            title="Align Center"
            active={isActive("align-center") && true}
            onClick={() => toggleButton("align-center")}
          >
            <AlignCenter size={18} />
          </ToolbarButton>
          <ToolbarButton
            title="Align Right"
            active={isActive("align-right") && true}
            onClick={() => toggleButton("align-right")}
          >
            <AlignRight size={18} />
          </ToolbarButton>
          <ToolbarButton
            title="Justify"
            active={isActive("align-justify") && true}
            onClick={() => toggleButton("align-justify")}
          >
            <AlignJustify size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Heading group */}
        <ToolbarGroup>
          <ToolbarButton title="Heading 1">
            <Heading1 size={18} />
          </ToolbarButton>
          <ToolbarButton title="Heading 2">
            <Heading2 size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* List group */}
        <ToolbarGroup>
          <ToolbarButton title="Bullet List">
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton title="Numbered List">
            <ListOrdered size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Insert group */}
        <ToolbarGroup>
          <ToolbarButton title="Insert Link">
            <Link size={18} />
          </ToolbarButton>
          <ToolbarButton title="Insert Image">
            <Image size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <ToolbarDivider />

        {/* Format group */}
        <ToolbarGroup>
          <ToolbarButton title="Code Block">
            <Code size={18} />
          </ToolbarButton>
          <ToolbarButton title="Quote">
            <Quote size={18} />
          </ToolbarButton>
        </ToolbarGroup>
      </div>
    </div>
  );
};

// Define ToolbarGroup component
const ToolbarGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="flex items-center gap-1">{children}</div>;
};

// Define ToolbarButton component
const ToolbarButton: React.FC<{
  children: React.ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ children, title, active = false, onClick }) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        active ? "bg-gray-100 text-blue-600" : "text-gray-700"
      }`}
    >
      {children}
    </button>
  );
};

// Define ToolbarDivider component
const ToolbarDivider: React.FC = () => (
  <div className="w-px h-6 bg-gray-200 mx-1" />
);

export default TextEditorToolbar;
