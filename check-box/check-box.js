(function (window, document) {
	"use strict";
	
	const thatDoc = document;
	const thisDoc = thatDoc.currentScript.ownerDocument;
	
	const template = thisDoc.querySelector("template").content;
	
	class CheckBoxElement extends HTMLElement {
		constructor() {
			super();
		}

		set checked(value) {
			this.checkbox.checked = !!value;
			this.updateCheckedAttribute();
		}
		get checked() {
			return this.checkbox.checked;
		}

		updateCheckedAttribute() {
			if (this.checkbox.checked) {
				this.setAttribute("checked", true);
			} else {
				this.removeAttribute("checked");
			}
		}

		createdCallback() {
			this.createShadowRoot();
			
			const clone = thatDoc.importNode(template, true);
			this.shadowRoot.appendChild(clone);
			
			this.checkbox = this.shadowRoot.querySelector("input");
			
			if (this.hasAttribute("checked")) {
				this.checkbox.checked = true;
			}
			if (this.hasAttribute("disabled")) {
				this.checkbox.disabled = true;
			}
			
			this.checkbox.addEventListener("change", () => {
				this.updateCheckedAttribute();
				const event = new window.Event("change");
				event.checked = this.checkbox.checked;
				this.dispatchEvent(event);
			});
		}
	}
	
	thatDoc.registerElement("check-box", CheckBoxElement);
})(window, document);
