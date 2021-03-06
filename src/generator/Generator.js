const GenerateVisitor = require("./GenerateVisitor");
const GenerateVisitor_tree = require("./GenerateVisitor_tree");
const ServletWriter = require("../../src/writer/ServletWriter");

/**
 * @param outpath {String} 输出绝对路径
 * @param compiler {Compiler} 编译实例
 * @param page {Node.Nodes} 节点链表
 * @return
 */
class Generator {
    /**
     *  生成树用于dom 树分析用
     * */
    static generateTree(page) {
        let a = new GenerateVisitor_tree();
        page.visit(a);
        // console.log(JSON.stringify(a.getTree()));
        return a.getTree();
    }

    static generateFn(compiler, out, page) {
        let gen = new GenerateVisitor(out, null, compiler)
        Generator.genStart(out)
        page.visit(gen);
        Generator.genEnd(out)// service }
        gen.generatePostamble(page);
        Generator.genEnd(out)//with }

    }

    static genStart(out) {
        out.print(`
    var ForEachImpl = option.ForEachImpl;
    var IfImpl = option.IfImpl;
    var IncludeImpl = option.IncludeImpl;
    var pageContext = new option.PageContext(data);
    var ${GenerateVisitor.OUT_STR}="";
    with (data || {}) {
        var out = option.out;
        try {
            service()
        }
        catch (e) {
           throw  new Error(e);
        }
        function service (n) {`)
    }

    static genEnd(out) {
        out.print(` }`)
    }
}

module.exports = Generator;