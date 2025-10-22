/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Selection } from "@tiptap/extensions";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { ColorHighlightPopoverContent } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkContent } from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";
import { RiArrowRightDoubleFill } from "react-icons/ri";

// --- Hooks ---
import { useIsMobile } from "@/hooks/use-mobile";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---
// import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";
import { CustomImage } from "@/components/tiptap-node/image-upload-node/custom-img-resizer";
import ResizeImageModal from "./resizeImageModal/Resize-imgModal";

import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { FormatColorFill } from "@mui/icons-material";

const MainToolbarContent = ({
  isMobile,
  editor,
}: {
  onHighlighterClick: () => void;
  onLinkClick: () => void;
  isMobile: boolean;
  editor: any;
}) => {
  const [openResizeModal, setOpenResizeModal] = React.useState(false);

  const handleResize = (width: string, height: string) => {
    editor?.chain().focus().updateAttributes("image", { width, height }).run();
  };

  // highlight menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const highlightColors = [
    { name: "Yellow", color: "#ffd54f", text: "#000" },
    { name: "Red", color: "#ff5252", text: "#fff" },
    { name: "Ash", color: "#b0bec5", text: "#000" },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHighlight = (color: string) => {
    const textColor = color === "#ff5252" ? "#fff" : "#000"; // ensures contrast
    editor
      ?.chain()
      .focus()
      .setColor(textColor)
      .toggleHighlight({ color })
      .run();
    handleClose();
  };

  const handleHighlightClear = () => {
    editor?.chain().focus().unsetHighlight().run();
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center overflow-y-visible p-1 rounded-lg  border-b border-b-third w-full">
      <div className="flex">
        <ToolbarGroup>
          <UndoRedoButton action="undo" />
          <UndoRedoButton action="redo" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
          <ListDropdownMenu
            types={["bulletList", "orderedList", "taskList"]}
            portal={isMobile}
          />
          <BlockquoteButton />
          <CodeBlockButton />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="code" />
          <MarkButton type="underline" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <MarkButton type="superscript" />
          <MarkButton type="subscript" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <TextAlignButton align="left" />
          <TextAlignButton align="center" />
          <TextAlignButton align="right" />
          <TextAlignButton align="justify" />
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <ImageUploadButton text="Add" />
          <Button
            data-style="ghost"
            onClick={() => {
              editor?.chain().focus().clearContent(true).run();
            }}
          >
            Clear
          </Button>
        </ToolbarGroup>
      </div>

      {isMobile && <ToolbarSeparator />}
      <div>
        <ToolbarGroup>
          <div className="border-r-2 border-accent flex gap-1 pr-2 mr-2">
            <p className="flex items-center gap-1">
              Align Photo <RiArrowRightDoubleFill />
            </p>
            <Button
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .updateAttributes("image", { align: "left" })
                  .run()
              }
            >
              Left
            </Button>
            <Button
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .updateAttributes("image", { align: "center" })
                  .run()
              }
            >
              Center
            </Button>
            <Button
              onClick={() =>
                editor
                  ?.chain()
                  .focus()
                  .updateAttributes("image", { align: "right" })
                  .run()
              }
            >
              Right
            </Button>
            <div style={{ display: "flex", gap: "8px" }}>
              {/* Other editor buttons */}
              <Button onClick={() => setOpenResizeModal(true)}>Resize</Button>

              <ResizeImageModal
                open={openResizeModal}
                onClose={() => setOpenResizeModal(false)}
                onResize={handleResize}
              />
            </div>
          </div>

          <ToolbarGroup className="relative">
            <div>
              <Button color="inherit" onClick={handleClick}>
                Highlight
              </Button>

              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {highlightColors.map(({ name, color }) => (
                  <MenuItem
                    key={color}
                    onClick={() => handleHighlight(color)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <ListItemIcon>
                      <span
                        style={{
                          display: "inline-block",
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          backgroundColor: color,
                          border: "1px solid #ccc",
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                  </MenuItem>
                ))}

                <MenuItem onClick={() => handleHighlightClear()}>
                  <ListItemIcon>
                    <FormatColorFill
                      fontSize="small"
                      sx={{
                        transform: "rotate(180deg)",
                        color: "#777",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>Clear Highlight</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          </ToolbarGroup>
        </ToolbarGroup>

        {/* <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup> */}
      </div>
    </div>
  );
};

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link";
  onBack: () => void;
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
);
interface SimpleEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export function SimpleEditor({ value, onChange }: SimpleEditorProps) {
  const isMobile = useIsMobile();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = React.useState<
    "main" | "highlighter" | "link"
  >("main");
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const editor = useEditor({
    content: value || "<p></p>", // controlled initial content
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      // << new ones for text color >>
      TextStyle,
      Color.configure({ types: ["textStyle"] }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      CustomImage,
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // sync editor content with parent form
    },
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  React.useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              editor={editor}
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  );
}
