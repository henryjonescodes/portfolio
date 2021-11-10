import styled from "styled-components";

export const StyledLabel = styled.label`
    color: ${({lightcolor}) => (lightcolor ? 'var(--text3)' : 'var(--text)')};
    text-transform: uppercase;
    font-size: 12px;
    width: 120%;
    margin-bottom: 10px;
    text-align: center;
    @media screen and (max-width: 700px){
        font-size: 11px;
        line-height:11px;
        width: 180%;
    }
`

export const Img = styled.img`
    position: relative;
    width: 100%;
`

export const SkillsText = styled.p`
    color: ${({lightcolor}) => (lightcolor ? 'var(--text4)' : 'var(--text)')};
    font-size: 11px;
    text-align: center;
    width: 160%;
    line-height: 12px;
    font-weight: 600;
    letter-spacing: .3px;
    text-transform: uppercase;
    margin: 2px 2px;

    @media screen and (max-width: 700px){
        font-size: 10px;
        line-height:10px;
    }
`
