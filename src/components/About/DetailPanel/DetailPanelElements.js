import styled from "styled-components";

export const DetailWrapper = styled.div`
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90px;
    /* border: 1px solid green; */
    margin: 0px 0px;
`

export const ImgWrap = styled.div`
    position: relative;
    margin: 5px 5px;
    height: 80px;
    width: 80px;
    /* border: 1px solid #ff0; */
`


export const Img = styled.img`
    position: relative;
    height: 100%;
    /* margin: 0 0 10px 0; */
    /* padding-right: 0; */
    /* border: 2px dashed blue; */
`

export const TextWrapper = styled.div`
    position: relative;
    /* margin: 5px 5px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    width: 210px;
    @media screen and (max-width: 700px){
        width: 180px;
  
    }

    @media screen and (max-width: 620px){
        width: 150px;
   
    }
    /* border: 1px solid #f00; */
`

export const UpperCaseLine = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t1};
    --text2: ${props => props.theme.t3};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 14px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 2px 0px;

    @media screen and (max-width: 700px){
        font-size: 10px;
        line-height: 12px;
    }

    @media screen and (max-width: 620px){
        font-size: 8px;
        line-height: 10px;
    }
`

export const SubtitleUpperCase = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 12px;
    line-height: 12px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin: 2px 0px;

    @media screen and (max-width: 700px){
        font-size: 9px;
        line-height: 9px;
    }

    @media screen and (max-width: 620px){
        font-size: 7px;
        line-height: 7px;
    }
`
export const SubtitleItalic = styled.p`
    /* border: 1px solid violet; */
    --text: ${props => props.theme.t2};
    --text2: ${props => props.theme.t4};
    color: ${({lightcolor}) => (lightcolor ? 'var(--text)' : 'var(--text2)')};
    font-size: 10px;
    line-height: 10px;
    font-weight: 700;
    letter-spacing: 1.4px;
    font-style: italic;
    margin: 2px 0px;

    @media screen and (max-width: 620px){
        font-size: 8px;
        line-height: 8px;
    }
`