var proworksConverter = ( function() {
  var json2xml_str = function( data, options ) {
    var singular = !_.isArray(data),
        result = singular ? data : { vector: { data: [] } },
        dataList,
        nodeName,
        x2js;

    options = options || {};

    if ( options.defaultXMLConverter ) {
      x2js = options.defaultXMLConverter;
    }

    if ( !singular ) {
      dataList = result.vector.data;
      nodeName = options.nodeName ? options.nodeName : 'element';

      _.reduce( data, function( memo, item ) {
        var nodeWrapper = {};
        _.each( item, function( value, key, list ) {
          list[key] = { _value: value };
        });
        nodeWrapper[nodeName] = item;
        memo.push( nodeWrapper );
        return memo;
      }, dataList, this );
    }

    return x2js ? x2js.json2xml_str(result) : '<request/>';
  };

  var xml2json = function( data, options ) {
    var result,
      singular,
      x2js;

    if ( options.defaultXMLConverter ) {
      x2js = options.defaultXMLConverter;

      result = x2js.xml2json( data );
      singular = !(result.vector && result.vector.data) ? true : _.isArray(result.vector.data) ? false : true;

      if ( !singular ) {
        result = result.vector.data;
        result = _.map( result, function( item, idx, list ) {
          list[idx] = item[_.keys(item)[0]];
          _.each( list[idx], function( value, key, obj ) {
            obj[key] = value._value;
          });
          return list[idx];
        });
      }
    } else {
      result = { response: null };
    }

    return result;
  };

  return {
    json2xml_str: json2xml_str,
    xml2json: xml2json
  }
})();