/**
 * @description 確認格式正確用，不會回傳任何值
 * @param  {any} par
 * @param  {string} from
 */
export declare function check_parameter(par: any, from: string): void;
/**
 * @param  {any} aims_par
 * @param  {object} source
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean}
 */
export declare function match_par(aims_par: any, source: object, strict_equality?: boolean): boolean[];
/**
 * @param  {any} iterator
 * @param  {any} yn
 * @param  {boolean} strict_equality if trun , use === , if false, use ==
 * @returns {boolean}
 */
export declare function match_iterator(iterator: any, yn: any, strict_equality?: boolean): boolean;
/**
 * @description 比對看看符不符合規則，符合就執行 function
 * @param  {any} aims match json
 * @param  {object} source source json
 * @param  {boolean} strict_equality  if trun , use === , if false, use ==
 * @returns {boolean}
 */
export declare function match(aims: any, source: object, strict_equality?: boolean): boolean;
//# sourceMappingURL=match.d.ts.map