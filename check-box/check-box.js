(function (window, document) {
	"use strict";
	
	const ownerDocument = document.currentScript.ownerDocument;
	
	const template = ownerDocument.querySelector("template").content;
	
	class CheckBoxElement extends HTMLElement {
		constructor() {
			super();

			const shadowRoot = this.attachShadow({
				mode: "closed"
			});

			const clone = template.cloneNode(true);
			shadowRoot.appendChild(clone);
			
			this._checkbox = shadowRoot.querySelector("input");
			
			if (this.hasAttribute("checked")) {
				this._checkbox.checked = true;
			}
			if (this.hasAttribute("disabled")) {
				this._checkbox.disabled = true;
			}
			
			this._checkbox.addEventListener("change", () => {
				const checked = this._checkbox.checked;
				this._updateCheckedAttribute(checked);
				const event = new window.Event("change");
				event.checked = this._checkbox.checked;
				this.dispatchEvent(event);
			});
		}

		static get observedAttributes() {
			return [
				"checked",
			];
		}

		attributeChangedCallback(name, oldValue, newValue) {
			if (name === "checked") {
				const checked = newValue !== null;
				this._checkbox.checked = checked;
			}
		}

		set checked(value) {
			const checked = !!value;
			this._updateCheckedAttribute(checked);
		}
		get checked() {
			return this._checkbox.checked;
		}

		_updateCheckedAttribute(checked) {
			if (checked) {
				this.setAttribute("checked", "");
			} else {
				this.removeAttribute("checked");
			}
		}
	}

	window.customElements.define("check-box", CheckBoxElement);
})(window, document);
