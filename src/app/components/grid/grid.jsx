import React, {useEffect } from "react";
import { connect } from "react-redux";

import Row from "./row";
import { Box, Container, Paper, Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";

import { iterate, generate } from "../../redux/actions/gridActionCreators";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2em",
    margin: "2em",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
  },
  inputs: {
      paddingLeft:0,
    paddingBottom: "1em",
  },
  input: {
    width: 50,
  },
}));

const Grid = (props) => {
  const classes = useStyles();
  const [width, setWidth] = React.useState(5);
  const [height, setHight] = React.useState(5);

  const maxWidth = 30;
  const maxHeight = 30;

  useEffect(() => {
    generate();
  }, []);

  const iterate = () => {
    props.iterate();
  };

  const generate = () => {
    props.generate(height, width);
  };

  const handleWidthChange = (event) => {
    setWidth(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleHeightChange = (event) => {
    setHight(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlurWidth = () => {
    if (width < 1) {
      setWidth(1);
    } else if (width > maxWidth) {
      setWidth(maxWidth);
    }
  };

  const handleBlurHeight = () => {
    if (height < 1) {
      setHight(1);
    } else if (height > maxHeight) {
      setHight(maxHeight);
    }
  };

  return (
    <Container className={classes.root}>
      <Button onClick={iterate}>Iterate</Button>
      <Button onClick={generate}>Generate</Button>
      <Container className={classes.inputs}>
        <Typography>Width: </Typography>
        <Input
          className={classes.input}
          value={width}
          margin="dense"
          onChange={handleWidthChange}
          onBlur={handleBlurWidth}
          inputProps={{
            step: 1,
            min: 1,
            max: maxWidth,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        <Typography>Height: </Typography>
        <Input
          className={classes.input}
          value={height}
          margin="dense"
          onChange={handleHeightChange}
          onBlur={handleBlurHeight}
          inputProps={{
            step: 1,
            min: 1,
            max: maxHeight,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Container>
      <Container className={classes.grid}>
        {props.rows.map((row) => (
          <Row key={Math.random()} row={row} />
        ))}
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { rows: state.gridReducer.rows };
};

function mapDispatchToProps(dispatch) {
  return {
    iterate: () => iterate(dispatch),
    generate: (rows, cols) => generate(rows, cols, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
