class SayforMain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cowsay: "",
            fortune: "",
            inst: false,
        };

        // This binding is necessary to make `this` work in the callback
        this.say = this.say.bind(this);
        this.toJaUrl = this.toJaUrl.bind(this);
        this.makeTwButton = this.makeTwButton.bind(this);
    }

    say() {
        this.setState({ inst: false });
        setTimeout(() => {
            ky.default("/api/say").json().then((res) => {
                this.setState(res);
                this.makeTwButton();
                this.setState({ inst: true });
            });
        }, 500);
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
    toGglUrl() {
        const enc = encodeURI(this.state.fortune);
        const base = "https://www.google.com/search";
        const url = `${base}?q=${enc}`;
        return url;
    }
    render() {
        return (
            <div id="wrap_main">
                <div className="text-center">
                    <button type="button" id="say" onClick={this.say}>
                        say!
                    </button>
                </div>

                <ReactTransitionGroup.CSSTransition
                    in={this.state.inst}
                    timeout={{
                        enter: 0,
                        exit: 6000,
                    }}
                    classNames="fade"
                >
                    <div className="fade">
                        <pre id="cowsay">
                            {this.state.cowsay}
                        </pre>

                        <div id="btns" className="flrow">
                            <div className="flitem">
                                {this.state.fortune !== ""
                                    && <a id="toja" target="_blank" href={this.toJaUrl()} className="button button-outline sametwbutton">to Ja</a>}
                            </div>
                            <div className="flitem">
                                {this.state.fortune !== ""
                                    && <a id="toggl" target="_blank" href={this.toGglUrl()} className="button button-outline sametwbutton">to Ggl</a>}
                            </div>
                            <div className="flitem">
                                <span id="twbutton"></span>
                            </div>
                        </div>
                    </div>
                </ReactTransitionGroup.CSSTransition>
            </div >
        );
    }
}

ReactDOM.render(
    <SayforMain />,
    document.querySelector('#main_content')
);