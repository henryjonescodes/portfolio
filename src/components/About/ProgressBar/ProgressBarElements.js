import styled from 'styled-components'

// export const ProgressBarWrapper = styled.div`
//     background: "#121212";
//     height: 100vh;
//     margin-top: 0;
//     display: flex;
//     justify-content: center;
//     font-size: 1rem;
//     position: sticky;
//     top: 0;
//     z-index: 10;
// `

export const ProgressBarWrapper = styled.aside`
    position: fixed;
    z-index:999;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
`