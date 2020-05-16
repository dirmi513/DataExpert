import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal" 
import restoreCode from "../../../../../../static/frontend/scripts/restoreCode"

const RestoreCodeModal = (props) => {   
	const modalData = {
		"show": props.show,
		"onHide": props.onHide 
	}
	const {course, lesson, slide, lessonData} = props   

	const execRestoreCode = async () => {   
		const arr = await restoreCode(course, lesson, slide, lessonData)   
		if (arr != null && arr != undefined) {  
			props.update(arr)
			props.get(arr, slide)
		}   
		props.onHide() 
	}
 
	return ( 
		<Modal
			{...modalData}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter" 
			centered
			className="modal-right-pane"
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Restore Code for Current Slide ?
				</Modal.Title>
			</Modal.Header>
			<Modal.Body> 
				<p>
					Are you sure that you want to restore the code in the text editor to the default for this slide? The restoration will replace all of the current code in your text editor, and this <strong>cannot</strong> be undone.
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button 
					onClick={execRestoreCode} 
					className="restore-code-modal-button shadow-none"
				>
					Restore Code
				</Button>
				<Button 
					onClick={props.onHide} 
					className="restore-code-modal-button shadow-none"
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal> 
	)
}

export default RestoreCodeModal 