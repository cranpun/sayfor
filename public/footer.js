class SayforFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            last_updated: "...",
        };

        // This binding is necessary to make `this` work in the callback
        this.say = this.say.bind(this);
        this.toJaUrl = this.toJaUrl.bind(this);
        this.makeTwButton = this.makeTwButton.bind(this);

        this.loadLastUpdated();
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
    loadLastUpdated() {
        ky.default("/api/lastupdated").json().then((res) => {
            this.setState(res);
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
    toGglUrl() {
        const enc = encodeURI(this.state.fortune);
        const base = "https://www.google.com/search";
        const url = `${base}?q=${enc}`;
        return url;
    }
    render() {
        return (
            <div id="wrap_footer" class="flrow">
                <div class="flitem">
                    <span>&copy;copyright </span>
                    <a href="https://twitter.com/cranpun">
                        @cranpun
                    </a>
                </div>
                <div class="flitem">
                    last updated : {this.state.last_updated}
                </div>
            </div >
        );
    }
}

ReactDOM.render(
    <SayforFooter />,
    document.querySelector('#footer_content')
);