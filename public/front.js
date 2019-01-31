class Sayfor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cowsay: "",
            fortune: "",
        };

        // This binding is necessary to make `this` work in the callback
        this.say = this.say.bind(this);
        this.toJaUrl = this.toJaUrl.bind(this);
        this.makeTwButton = this.makeTwButton.bind(this);
    }

    say() {
        const self = this;
        ky.default("/api/say").json().then((res) => {
            console.log(res);
            self.setState(res);
            self.makeTwButton();
        });
    }

    makeTwButton() {
        const cssid = "#twbutton";
        // 前の要素は削除
        const wrap = document.querySelector(cssid);
        while (wrap.firstChild) {
            wrap.removeChild(wrap.firstChild);
        }

        const opt = {
            text: this.state.fortune,
            hashtags: "SayFor,cowsayfortune",
            size: "large",
        };
        twttr.widgets.createShareButton(
            location.href,
            document.querySelector(cssid),
            opt);
    }

    toJaUrl() {
        const enc = encodeURI(this.state.fortune);
        const base = "https://translate.google.com/";
        const url = `${base}?sl=en&tl=ja&text=${enc}`;
        return url;
    }

    render() {
        return (
            <div id="wrap">
                <button type="button" id="say" onClick={this.say}>
                    say!
                </button>

                <pre id="cowsay">
                    {this.state.cowsay}
                </pre>

                <div class="flrow">
                    <div class="flitem">
                        {this.state.fortune !== ""
                            && <a id="toja" target="_blank" href={this.toJaUrl()} class="button button-outline">to Ja</a>}
                    </div>
                    <div class="flitem">
                        <span id="twbutton"></span>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Sayfor />,
    document.querySelector('#sayfor')
);