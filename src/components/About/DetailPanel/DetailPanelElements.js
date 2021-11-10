import styled from "styled-components";

export const DetailWrapper = styled.div`
    position: relative; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    margin: 5px 0px;

    @media screen and (max-width: 500px){
        flex-direction: column;
        margin: 0px 0px;
    }
`

export const ImgWrap = styled.div`
    position: relative;
    margin: 5px 5px;
    height: 80px;
    width: 80px;

    @media screen and (max-width: 620px){
        margin: 3px 3px;
        height: 60px;
        width: 60px;  
    }
    @media screen and (max-width: 500px){
        margin: 2px 2px;
        height: 40px;
        width: 40px;  
    }

    /* border: 1px solid #ff0; */
`

export const Img = styled.img`
    position: relative;
    height: 100%;
`

export const TextWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: left;

    @media screen and (max-width: 500px){
        /* justify-content: center; */
        align-items: center;
    }

    /* border: 1px solid #f00; */
`

export const UpperCaseLine = styled.p`
    --text: ${props => props.theme.t1};
    --text2: ${props => props.theme.t3};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 13px;
    line-height: 15px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: left;
    margin: 2px 0px;

    @media screen and (max-width: 620px){
        font-size: 12px;
        line-height: 14px;
    }

    @media screen and (max-width: 500px){
        text-align: center;
        letter-spacing: 0.8px;
    }

    @media screen and (max-width: 450px){
        font-size: 10px;
        line-height: 12px;   
        letter-spacing: 0.7px; 
    }

    /* border: 1px solid violet; */
`

export const SubtitleUpperCase = styled.p`
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 12px;
    line-height: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 2px 0px;

    @media screen and (max-width: 620px){
        font-size: 9px;
        line-height: 9px;
    }

    @media screen and (max-width: 500px){
        text-align: center;
    }

    /* border: 1px solid violet; */
`
export const SubtitleItalic = styled.p`
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (!lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 10px;
    line-height: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    font-style: italic;
    margin: 2px 0px;

    @media screen and (max-width: 500px){
        text-align: center;
    }
    
    /* border: 1px solid violet; */
`