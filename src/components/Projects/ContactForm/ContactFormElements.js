import styled from "styled-components";

export const DiagonalBox = styled.div`
	// background-image: linear-gradient(45deg, #6303B1, #ff0099);
    // transform: skewY(-11deg);
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: linear-gradient(45deg, #6303B1, #ff0099);
    transform: skewY(-11deg);
    height: 600px;

`
export const ContentContainer = styled.div`
    max-width: 50em;
	margin: 0 auto;
	transform: skewY(11deg);
    height: 100%;

    border: 5px solid red;
`
