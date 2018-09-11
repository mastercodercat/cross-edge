import { Button } from 'antd';
import { Buttons, ButtonsGroup } from './styles/button.style';

const AntButton = Buttons(Button);
const ButtonGroup = ButtonsGroup(Button.Group);

export default AntButton;
export { ButtonGroup };
