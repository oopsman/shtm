const PAGE_SCOPE = 1;
const REQUEST_SCOPE = 2;
const SESSION_SCOPE = 3;
const APPLICATION_SCOPE = 4;

const PAGE = "node.jstl.jsPage";
const REQUEST = "node.jstl.jsRequest";
const SESSION = "node.jstl.jsSession";

const ELparser = require("../ast/ELparser");
const path = require("path");

class PageContext {
    constructor(data) {
        this.data = data;
        this.attributes = {};
        this.isNametableInitialized = false;
    }

    setAttribute(name, attribute) {
        if (attribute != null) {
            if (!this.isNametableInitialized) {
                this.initializePageScopeNameTable();
            }
            this.data[name] = attribute;
        } else {
            this.data[name] = null;
        }
    }

    removeAttribute(name) {
        this.data[name] = null;
    }

    hasValue(itemName) {
        return this.data[itemName] != null;
    }

    getAttribute(name) {
        if (!this.isNametableInitialized) {
            this.initializePageScopeNameTable();
        }
        return this.data[name];
    }

    initializePageScopeNameTable() {
        // 留着以后扩展吧，暂时用不到
        this.isNametableInitialized = true;
        this.setAttribute(PAGE, {})
        this.setAttribute(REQUEST, {})
        this.setAttribute(SESSION, {})
    }
}

module.exports = PageContext;