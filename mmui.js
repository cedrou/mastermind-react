/** @jsx React.DOM */
var GRID_SIZE = 40;


var CodeDigitView = React.createClass({
    handleClick: function() {
        if (this.props.hasOwnProperty("onClick"))
            this.props.onClick(this.props.value);
    },

    render: function () {
		var classes = "codedigit";
		if (this.props.hasOwnProperty("value"))
		    classes += " value" + this.props.value;

		return <div onClick={this.handleClick} className={classes} />;
	}
});

var CodeView = React.createClass({
	render: function () {
		var digits = [];
		for (var i = 0; i < this.props.game.codeSize; i++)
		{
		    if (i < this.props.code.length)
		        digits.push(<CodeDigitView index={i} value={this.props.code[i]} />);
            else
		        digits.push(<CodeDigitView index={i} />);
		}

		var style = {
			width: this.props.game.codeSize * GRID_SIZE,
			height: GRID_SIZE
		};

		return <div className="code" style={style}>{digits}</div>;
	}
});



var MatchView = React.createClass({
    render: function () {
        var matches = [];
        for (var i = 0; i < this.props.guess.positionMatches; i++ )
            matches.push(<div className="match positionMatch" />);
        for (var i = 0; i < this.props.guess.colorMatches; i++ )
            matches.push(<div className="match colorMatch" />);
        while (matches.length < this.props.guess.guess.length)
            matches.push(<div className="match" />);

        return <div className="matches">{matches}</div>;
    }
});



var ControlBar = React.createClass({
    addDigit: function (digit) {
        this.props.game.guess.push(digit);
        if (this.props.game.guess.length == this.props.game.codeSize)
        {
            this.props.game.play();
        }
        this.props.onUpdate();
    },

	render: function() {
		var digits = [];
		for (var i = 0; i < this.props.game.colorSize; i++)
		    digits.push(<CodeDigitView index={i} value={i} onClick={this.addDigit} />);

		var style = {
			height: GRID_SIZE
		};

		return (
            <div className="controlbar" style={style}>
                {digits}
            </div>
	    );
	}
});

var GuessView = React.createClass({
    render: function() {
        return <CodeView game={this.props.game} code={this.props.guess.guess} />;
    }
});

var GuessesView = React.createClass({
    render: function() {
        var guesses = [];
        for (var i = this.props.game.guesses.length-1; i >= 0; i--)
            guesses.push(
                <div className="guess">
                    <CodeView game={this.props.game} code={this.props.game.guesses[i].guess} />
                    <MatchView game={this.props.game} guess={this.props.game.guesses[i]} />
                </div>
            );
        return <div>{guesses}</div>;
    }
});

var ContainerView = React.createClass({

	getInitialState: function() {
		return {'game': this.props.game};
	},

	onGameUpdate: function() {
		this.setState({"game": this.props.game});
	},

	render: function() {
		return (
            <div>
                <ControlBar game={this.state.game} onUpdate={this.onGameUpdate.bind(this)} />
                <CodeView game={this.state.game} code={this.state.game.guess} />
                <GuessesView game={this.state.game} />
            </div>
        )
	}

});

var CODE_SIZE = 4;
var NB_COLORS = 8;
var MAX_TRIALS = 10;

var game = new Mastermind(CODE_SIZE, NB_COLORS, MAX_TRIALS);

React.render(
    <ContainerView game={game} />,
    document.getElementById('main')
);