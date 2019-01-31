const u = () => {};

// ライブラリ
const exec = require("child_process").execSync;
const Entities = require("html-entities").Html5Entities;
const entities = new Entities();

u.exec = (command) => {
    const result = exec(command);
    const str = result.toString();
    return str;
}

u.spc2html = (str) => {
    const ret = entities.encode(str);
    return ret;
}
u.removeChild = (cssid) => {
    const wrap = document.querySelector(cssid);
    while(wrap.firstChild) {
        wrap.removeChild(wrap.firstChild);
    }
}
module.exports = u;
