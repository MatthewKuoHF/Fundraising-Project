import React, { Component } from "react";
import {
    convertToRaw,
    EditorState,
    fontSize,
    left,
    center,
    right,
    justify,
    color,
    link,
    unlink,
    emoji,
    image,
    undo,
    redo
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./Upload.css";
import { Button } from "react-bootstrap";

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            text: ""
        };
    }
    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        let text = stateToHTML(this.state.editorState.getCurrentContent());
        this.setState({ text });
    };
    render() {
        const { editorState } = this.state;
        return (
            <div className="outer">
                <div className="upload">
                    <div style={{}}>
                        <h4
                            style={{
                                width: "auto",
                                float: "left",
                                marginRight: "1rem",
                                textAlign: "center"
                            }}
                        >
                            Title:
                        </h4>
                        <input
                            type="text"
                            autoFocus
                            style={{ width: "30%" }}
                        ></input>
                    </div>

                    <Editor
                        toolbar={{
                            options: [
                                // "inline",
                                "blockType",
                                // "fontSize",
                                // "fontFamily",
                                // "list",
                                // "textAlign",
                                // "colorPicker",
                                "link",
                                // "embedded",
                                "emoji",
                                "image",
                                // "remove",
                                "history"
                            ],
                            blockType: {
                                inDropdown: true,
                                options: [
                                    "Normal",
                                    "H1",
                                    "H2",
                                    "H3",
                                    "H4",
                                    "H5",
                                    "H6"
                                    // "Blockquote",
                                    // "Code"
                                ],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined
                            },
                            fontSize: {
                                icon: fontSize,
                                options: [
                                    8,
                                    9,
                                    10,
                                    11,
                                    12,
                                    14,
                                    16,
                                    18,
                                    24,
                                    30,
                                    36,
                                    48,
                                    60,
                                    72,
                                    96
                                ],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined
                            },
                            fontFamily: {
                                options: [
                                    "Arial",
                                    "Georgia",
                                    "Impact",
                                    "Tahoma",
                                    "Times New Roman",
                                    "Verdana"
                                ],
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined
                            },
                            textAlign: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ["left", "center", "right", "justify"],
                                left: { icon: left, className: undefined },
                                center: { icon: center, className: undefined },
                                right: { icon: right, className: undefined },
                                justify: { icon: justify, className: undefined }
                            },
                            colorPicker: {
                                icon: color,
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                colors: [
                                    "rgb(97,189,109)",
                                    "rgb(26,188,156)",
                                    "rgb(84,172,210)",
                                    "rgb(44,130,201)",
                                    "rgb(147,101,184)",
                                    "rgb(71,85,119)",
                                    "rgb(204,204,204)",
                                    "rgb(65,168,95)",
                                    "rgb(0,168,133)",
                                    "rgb(61,142,185)",
                                    "rgb(41,105,176)",
                                    "rgb(85,57,130)",
                                    "rgb(40,50,78)",
                                    "rgb(0,0,0)",
                                    "rgb(247,218,100)",
                                    "rgb(251,160,38)",
                                    "rgb(235,107,86)",
                                    "rgb(226,80,65)",
                                    "rgb(163,143,132)",
                                    "rgb(239,239,239)",
                                    "rgb(255,255,255)",
                                    "rgb(250,197,28)",
                                    "rgb(243,121,52)",
                                    "rgb(209,72,65)",
                                    "rgb(184,49,47)",
                                    "rgb(124,112,107)",
                                    "rgb(209,213,216)"
                                ]
                            },
                            link: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                dropdownClassName: undefined,
                                showOpenOptionOnHover: true,
                                defaultTargetOption: "_self",
                                options: ["link", "unlink"],
                                link: { icon: link, className: undefined },
                                unlink: { icon: unlink, className: undefined },
                                linkCallback: undefined
                            },
                            emoji: {
                                icon: emoji,
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                emojis: [
                                    "😀",
                                    "😁",
                                    "😂",
                                    "😃",
                                    "😉",
                                    "😋",
                                    "😎",
                                    "😍",
                                    "😗",
                                    "🤗",
                                    "🤔",
                                    "😣",
                                    "😫",
                                    "😴",
                                    "😌",
                                    "🤓",
                                    "😛",
                                    "😜",
                                    "😠",
                                    "😇",
                                    "😷",
                                    "😈",
                                    "👻",
                                    "😺",
                                    "😸",
                                    "😹",
                                    "😻",
                                    "😼",
                                    "😽",
                                    "🙀",
                                    "🙈",
                                    "🙉",
                                    "🙊",
                                    "👼",
                                    "👮",
                                    "🕵",
                                    "💂",
                                    "👳",
                                    "🎅",
                                    "👸",
                                    "👰",
                                    "👲",
                                    "🙍",
                                    "🙇",
                                    "🚶",
                                    "🏃",
                                    "💃",
                                    "⛷",
                                    "🏂",
                                    "🏌",
                                    "🏄",
                                    "🚣",
                                    "🏊",
                                    "⛹",
                                    "🏋",
                                    "🚴",
                                    "👫",
                                    "💪",
                                    "👈",
                                    "👉",
                                    "👉",
                                    "👆",
                                    "🖕",
                                    "👇",
                                    "🖖",
                                    "🤘",
                                    "🖐",
                                    "👌",
                                    "👍",
                                    "👎",
                                    "✊",
                                    "👊",
                                    "👏",
                                    "🙌",
                                    "🙏",
                                    "🐵",
                                    "🐶",
                                    "🐇",
                                    "🐥",
                                    "🐸",
                                    "🐌",
                                    "🐛",
                                    "🐜",
                                    "🐝",
                                    "🍉",
                                    "🍄",
                                    "🍔",
                                    "🍤",
                                    "🍨",
                                    "🍪",
                                    "🎂",
                                    "🍰",
                                    "🍾",
                                    "🍷",
                                    "🍸",
                                    "🍺",
                                    "🌍",
                                    "🚑",
                                    "⏰",
                                    "🌙",
                                    "🌝",
                                    "🌞",
                                    "⭐",
                                    "🌟",
                                    "🌠",
                                    "🌨",
                                    "🌩",
                                    "⛄",
                                    "🔥",
                                    "🎄",
                                    "🎈",
                                    "🎉",
                                    "🎊",
                                    "🎁",
                                    "🎗",
                                    "🏀",
                                    "🏈",
                                    "🎲",
                                    "🔇",
                                    "🔈",
                                    "📣",
                                    "🔔",
                                    "🎵",
                                    "🎷",
                                    "💰",
                                    "🖊",
                                    "📅",
                                    "✅",
                                    "❎",
                                    "💯"
                                ]
                            },

                            image: {
                                icon: image,
                                className: undefined,
                                component: undefined,
                                popupClassName: undefined,
                                urlEnabled: true,
                                uploadEnabled: true,
                                alignmentEnabled: false,
                                uploadCallback: undefined,
                                previewImage: false,
                                inputAccept:
                                    "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                alt: { present: false, mandatory: false },
                                defaultSize: {
                                    height: "auto",
                                    width: "auto"
                                }
                            },
                            history: {
                                inDropdown: false,
                                className: undefined,
                                component: undefined,
                                dropdownClassName: undefined,
                                options: ["undo", "redo"],
                                undo: { icon: undo, className: undefined },
                                redo: { icon: redo, className: undefined }
                            }

                            // inline: { inDropdown: true },
                            // list: { inDropdown: true },
                            // textAlign: { inDropdown: true },
                            // link: { inDropdown: true },
                            // history: { inDropdown: true }
                        }}
                        editorState={editorState}
                        wrapperClassName="wrapper"
                        editorClassName="editor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>
                <div>
                    {" "}
                    <Button
                        className="submit"
                        block
                        type="submit"
                        onClick={e => this.handleSubmit(e)}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default Upload;
