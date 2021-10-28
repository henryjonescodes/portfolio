import React from 'react'
import { Img, SkillsText, StyledLabel } from './IconListElements'

const IconList = ({src, alt, title, skill1, skill2, skill3}) => {
    return (
        <>
            <Img src={src} alt={alt}/>
            <StyledLabel lightcolor={true}>{title}</StyledLabel>
            <SkillsText lightcolor={true}>{skill1}</SkillsText>
            <SkillsText lightcolor={true}>{skill2}</SkillsText>
            <SkillsText lightcolor={true}>{skill3}</SkillsText>
        </>
    )
}

export default IconList
