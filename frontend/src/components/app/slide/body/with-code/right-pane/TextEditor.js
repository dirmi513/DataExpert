import React, {useState, useEffect} from "react"
import AceEditor from "react-ace"
import "../../../../../../../static/frontend/ace/src-noconflict/mode-python"
import "../../../../../../../static/frontend/ace/src-noconflict/theme-terminal"
import "../../../../../../../static/frontend/style/slide/textEditor.css"

const TextEditor = (props) => {
	const [userCode, setUserCode] = useState(props.code)

	const onChange = (newCode) => {
		setUserCode(newCode)
	}

	useEffect(() => {
		const editor = ace.edit("ace-editor");
		editor.setOption("indentedSoftWrap", false);

		// Written by Chuka
		function onResize() {
			const session = editor.session
			if (session) {
				editor.resize()
				if(session.getUseWrapMode()) {
					const characterWidth = editor.renderer.characterWidth;
					const contentWidth = editor.renderer.scroller.clientWidth;
					if(contentWidth > 0){
						session.setWrapLimit(parseInt((contentWidth  / characterWidth) - 1, 10));
					}
				}
			}
		}
		new ResizeObserver(onResize).observe(document.getElementById("ace-editor"))
	}, [])


	useEffect(() => {
		setUserCode(props.code)
	}, [props.slide, props.code])

	return (
		<>
		<AceEditor
			className="ace-editor-right-pane"
			mode="python"
			theme="terminal"
			onChange={onChange}
			fontSize={14}
			wrapEnabled={true}
			showPrintMargin={false}
			showGutter={true}
			highlightActiveLine={true}
			value={userCode}
		/>
		</>
	)
}

export default TextEditor
