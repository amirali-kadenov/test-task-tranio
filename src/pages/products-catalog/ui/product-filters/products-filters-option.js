export const Option = ({ selected, value, text }) => {
  return /* html */ `
      <option
      ${selected ? 'selected' : ''}
      value="${value}"
    >
      ${text}
    </option>
    `
}
