export const TERMS = {
  LIST: '* ',
  TAB: '  ',
}

export const getLine = ({ string, cursorPosition }) => {
  const texts = string.split('\n')
  const line = string.slice(0, cursorPosition).split('\n').length - 1
  return { text: texts[line], line }
}

export const onEnter = ({ string, cursorPosition }) => {
  const { text } = getLine({ string, cursorPosition })
  if (text.startsWith(TERMS.LIST))
    return addTermToHeadOfNewLine({ term: TERMS.LIST, string, cursorPosition })

  return addTermToHeadOfNewLine({ string, cursorPosition })
}

export const onTab = ({ string, cursorPosition }) => {
  const { text } = getLine({ string, cursorPosition })
  if (/^(\s\s)*\* /.test(text))
    return addTermToHeadOfLine({ term: TERMS.TAB, string, cursorPosition })

  return {
    string,
    newCursorPosition: cursorPosition,
  }
}

export const onTabShift = ({ string, cursorPosition }) => {
  const { text } = getLine({ string, cursorPosition })
  if (/^(\s\s)+\* /.test(text))
    return removeTermFromHeadOfLine({ term: TERMS.TAB, string, cursorPosition })

  return {
    string,
    newCursorPosition: cursorPosition,
  }
}

export const addTermToHeadOfNewLine = ({
  term = '',
  string,
  cursorPosition,
}) => {
  const textBeforeCursor = string.slice(0, cursorPosition)
  const textAfterCursor = string.slice(cursorPosition)
  return {
    string: `${textBeforeCursor}\n${term}${textAfterCursor}`,
    newCursorPosition: cursorPosition + term.length + 1,
  }
}

export const addTermToHeadOfLine = ({ term, string, cursorPosition }) => {
  const lines = string.split('\n')
  const { text, line } = getLine({ string, cursorPosition })
  lines.splice(line, 1, `${term}${text}`)
  return {
    string: lines.join('\n'),
    newCursorPosition: cursorPosition + term.length,
  }
}

export const removeTermFromHeadOfLine = ({ term, string, cursorPosition }) => {
  const lines = string.split('\n')
  const { text, line } = getLine({ string, cursorPosition })
  lines.splice(line, 1, text.replace(term, ''))
  return {
    string: lines.join('\n'),
    newCursorPosition: cursorPosition - term.length,
  }
}

export const toggleTermToHeadOfLine = ({ term, string, cursorPosition }) => {
  const { text } = getLine({ string, cursorPosition })
  if (text.startsWith(term)) {
    return removeTermFromHeadOfLine({ term, string, cursorPosition })
  } else {
    return addTermToHeadOfLine({ term, string, cursorPosition })
  }
}
