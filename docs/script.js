document.addEventListener("DOMContentLoaded", () => {
    const elementStructure = document.querySelector(".element-structure");
    const elementDescription = document.getElementById("element-description");
    const mainTable = document.getElementById("main-table");
  
    const elementInfo = {
        table: "The <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.",
        caption: "The <caption> element specifies a caption (or title) for a table.",
        colgroup: "The <colgroup> element defines a group of columns within a table.",
        col: "The <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.",
        thead: "The <thead> element defines a set of rows defining the head of the columns of the table.",
        tbody: "The <tbody> element encapsulates a set of rows (<tr> elements), indicating that they comprise the body of the table.",
        tfoot: "The <tfoot> element defines a set of rows summarizing the columns of the table.",
        tr: "The <tr> element defines a row of cells in a table. Those can be a mix of <td> and <th> elements.",
        th: "The <th> element defines a cell as the header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.",
        td: "The <td> element defines a cell of a table that contains data.",
    };

    const infoPanel = document.getElementById("info-panel");
    infoPanel.style.display = "none";
   
    function showInfo(element) {
        if (elementInfo[element]) {
            elementDescription.textContent = elementInfo[element];
            infoPanel.style.display = "block";
        }
    }
  
    function hideInfo() {
        infoPanel.style.display = "none";
    }

    function removeAllHighlights() {
        elementStructure.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));
        mainTable.querySelectorAll(".highlight").forEach(el => el.classList.remove("highlight"));
    }

    function highlightMatchingElements(sourceElement) {
        const dataElement = sourceElement.getAttribute("data-element");
        const elementId = sourceElement.getAttribute("id");

        let selectors = [];

        // Handle colgroup highlighting
        if (dataElement === "colgroup" || dataElement === "col") {
            selectors = [
                '[data-element="colgroup"]',
                dataElement && `[data-element="${dataElement}"]`
            ];
        } 
        // Handle individual td highlighting
        else if (dataElement === "td") {
            selectors = [
                `td#${elementId}`,
                `[data-element="td"][id="${elementId}"]`,
                `[scope="cell${elementId}"]`
            ];
        } 

        else if (dataElement === "thead" || dataElement === "th") {
            selectors = [
                `thead#${elementId}`,
                `[scope="col"]`,
                `tr[data-element="th"]`
            ]
        }

        else if (elementId === "main-table") {
            selectors = [
                `table#${elementId}`,
            ]
        }
        
        // Handle other elements
        else {
            selectors = [
                dataElement && `[data-element="${dataElement}"]`,
                elementId && `#${elementId}`,
             ].filter(Boolean);
        }

        window.requestAnimationFrame(() => {
            selectors.forEach(selector => {
                try {
                    const matchingElements = mainTable.querySelectorAll(selector);
                    matchingElements.forEach(el => el.classList.add("highlight"));
                } catch (e) {
                    console.error("Invalid selector:", selector);
                }
            });
        });
    }

    elementStructure.addEventListener("mouseover", (event) => {
        if (event.target.classList.contains("element")) {
            removeAllHighlights();
            event.target.classList.add("highlight");
            const elementType = event.target.getAttribute("data-element");
            showInfo(elementType);
            highlightMatchingElements(event.target);
        }
    });

    elementStructure.addEventListener("mouseout", (event) => {
        if (!event.relatedTarget || !event.relatedTarget.closest('.element-structure')) {
            hideInfo();
            removeAllHighlights();
        }
    });
});