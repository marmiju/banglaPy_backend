const Print = (value)=>{
    const expr = value.replace("লিখো", "").trim();
    return `print(${expr})`;
}
module.exports={Print}



