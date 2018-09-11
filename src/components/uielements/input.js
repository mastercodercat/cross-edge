import { Input } from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';

const { Search, TextArea, Group } = Input;

const StyledInput = InputWrapper(Input);

const InputGroup = InputGroupWrapper(Group);

const InputSearch = InputSearchWrapper(Search);

const Textarea = TextAreaWrapper(TextArea);

export default StyledInput;
export { InputSearch, InputGroup, Textarea };
