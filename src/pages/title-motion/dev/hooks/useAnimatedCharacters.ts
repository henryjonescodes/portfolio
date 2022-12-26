

export const getLetterLists = (text: string) => {
  const splitWords = text.split(" ")
  const letterLists: string[][] = []

  splitWords.forEach((item) => {
    letterLists.push(item.split(""))
  })

  // Add a space ("\u00A0") to the end of each word
  letterLists.map((ll, index) => {
    if (index === letterLists.length - 1) {
      return
    }
    return ll.push("\u00A0")
  })

  console.log(letterLists)
  return letterLists
}



const useAnimatedCharacters = () => {
}
  
export default useAnimatedCharacters
