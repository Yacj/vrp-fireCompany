import Vue from 'vue'
import { Cell, CellGroup } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Toast } from 'vant';
import { Empty } from 'vant';
import { NavBar } from 'vant';
import { Tag } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Icon } from 'vant';
import { Grid, GridItem } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { List } from 'vant';
import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);
Vue.use(List);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Grid);
Vue.use(GridItem)
Vue.use(Icon);
Vue.use(Button);
Vue.use(Field);
Vue.use(Tag);
Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Cell);
Vue.use(CellGroup);