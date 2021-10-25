import styled from 'styled-components'

export const ProgressBarPanel = styled.aside`
    position: fixed;
    z-index:999;
    width: 100%;
    height: 100%;
    background: #111;
    display: grid;
    align-items: center;
    justify-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
`
export const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    /* border: 1px solid yellow; */
`

export const StyledBarWrapper = styled.div`
    display: flex;
    flex-direction: row;

    progress {

    }

    progress[value]{
        -webkit-appearance: none;
        appearance: none;
        width: 400px;
        height: 30px;
        /* border: 1px solid green; */
    }

    progress[value]::-webkit-progress-bar{
        height: 60px;
        border-radius: 30px;
        background-color: #000;
    }

    progress[value]::-webkit-progress-value{
        height: 60px;
        border-radius: 30px;
        background-color: #b00;
    }
`



export const StyledProgressBar = styled.progress`

`

export const StyledProgressText = styled.p`
    padding-top: 10px;
    color: #666;
`

export const StyledProgressPercentage = styled.h1`
    text-align: center;
    padding: 20px 10px;
    color: #888;
`