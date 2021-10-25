import styled from "styled-components";

export const SkewContainer = styled.div`
    /* border: 1px solid blue; */
    /* display: flex; */
    /* justify-content: left; */
    /* align-items: center; */
    /* padding: 30px 30px; */
    height: 600px;
    position: relative;
    z-index: ${({above}) => (above? '20' : '5')};

    @media screen and (max-width: 700px){
        height: 300px;
        padding-top: 50px;
    }
`
export const SkewBox = styled.div`
    border: 1px solid red;
    background: ${props => props.theme.bg};
    transform: ${({skewRight}) => (skewRight? 'skewY(11deg)' : 'skewY(-11deg)')};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
`

export const SkewContentWrapper = styled.div`
    position: relative;
    border: 4px solid violet;
    /* max-width: 50em; */
    height: 100%;
	margin: 0 auto;
    /* padding-top: var(--skew-padding); */
    padding: var(--skew-padding) 0;

    z-index: ${({above}) => (above? '21' : '6')};
    transform: ${({skewRight}) => (skewRight? 'skewY(-11deg)' : 'skewY(11deg)')};
`
export const SkewContent = styled.div`
    position: absolute;
    border: 4px solid green;
    max-width: 50em;
    height: 100%;
    width: 100%;
	/* margin: 20 auto; */
    z-index: ${({above}) => (above? '22' : '7')};
    /* transform: translateY(var(--skew-padding)); */
`
export const CSSVariables = styled.div`
    --magic-number: 0.09719; /* tan(11°)/2 */
	--content-width: 100vw;
	--skew-padding: calc(var(--content-width) * var(--magic-number));

    @media screen and (min-width: 42em) {
		--content-width: 42em;
	}
`