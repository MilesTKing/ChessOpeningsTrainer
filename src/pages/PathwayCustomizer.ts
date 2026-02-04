import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {moveListView} from '../ui/MoveListView';

const pathRenderer= moveListView()
let path = PathwayCustomizer(pathRenderer)
path.beginPathCreation()