/**
 * @description 確認 par 格式正確用，不會回傳任何值，但格式錯了會直接噴錯
 * @param  {any} par par 本體
 * @param  {string} from 來自 aims_par 的哪個屬性 (and、or、not_and、not_or)
 */
export declare function check_parameter(par: any, from: string): void;
/**
 * @description match_par 用來比對 source 是否符合每個 aims_par 要求
 * @param  {any} aims_par aims_par本體
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean[]} result 回傳比對結果的 boolean[]
 */
export declare function match_par(aims_par: any, source: object, strict_equality?: boolean): boolean[];
/**
 * @param  {any} iterator iterator 是 aims_par 迭代出來的元素
 * @param  {any} yn yn 是 source 的 copy 但每次進迴圈會被剝掉最上面的一層
 * @param  {boolean} strict_equality if trun , use === , if false, use ==
 * @returns {boolean} 比對結果
 */
export declare function match_iterator(iterator: any, yn: any, strict_equality?: boolean): boolean;
/**
 * @description 比對看看符不符合規則，符合就執行 function
 * @param  {any} aims match json
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean} 比對結果
 */
export declare function match(aims: any, source: object, strict_equality?: boolean): boolean;
//# sourceMappingURL=match.d.ts.map