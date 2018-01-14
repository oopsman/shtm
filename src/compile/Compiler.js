/**
 * Created by ghy on 2017/11/17.
 */
const Generator = require("../generator/Generator-Api");
const JspReader = require("./JspReader");
const Parser = require("./Parser");
const path = require("path");
const FileWriter = require("../writer/FileWriter")
const StringWriter = require("../writer/StringWriter");
const ServletWriter = require("../writer/ServletWriter")

class Compiler {
    constructor(baseDir) {
        this.baseDir = baseDir
        this.cache = {};
    }

    setBaseDir(baseDir) {
        this.baseDir = baseDir;
    }

    compileTofile(filename, outPath) {
        try {
            this.doParserFile(filename, null, outPath);
        }
        catch (e) {
            console.log(e)
        }

    }

    compile(filename, data) {
        // let t1 = new Date ();
        let stringWriter = new StringWriter();
        let out = new ServletWriter(stringWriter);
        this.doParser(filename, null, out, data);
        // let t1 = new Date ();
        // console.log ("总时间", +new Date () - t1)
        return out.toString();
    }

    getReader(filename) {
        let reader = new JspReader(this.baseDir, filename);
        return reader;
    }

    getPageNode(filename, parent) {

        let pageNodes = this.cache[filename];
        if (pageNodes == null && false) {
            let reader = this.getReader(filename);
            pageNodes = Parser.parse(filename, reader, parent);
            this.cache[filename] = pageNodes;
        }
        return pageNodes;
    }

    doParser(filename, parent, out, data) {
        let pageNodes = this.getPageNode(filename, parent);
        Generator.generateStr(data, this, out, pageNodes, filename);
        // Generator.generateTree ( pageNodes);
    }
}

module.exports = Compiler;