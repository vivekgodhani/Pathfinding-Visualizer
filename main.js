
$(document).ready(function(){

    var k=0,l=0;
    var arr=new Array(25); 
    for( k=0;k<25;k++)
    {
      arr[k]=new Array(50);
    }
    for( k=0;k<25;k++)
    {
      for( l=0;l<50;l++)
      { 
            arr[k][l]={
                        isV:false,
                        i:0,
                        j:0,
                        mi:k,
                        mj:l,
                        iw:false,
                        val:20000
                      };
      }
    }
    $.fn.myFunction = function() 
    {       
        var ans=''
        var i=0,j=0;
        for(i=0;i<25;i++)
        {
          var  s='<tr > '
          for(j=0;j<50;j++)
          {
            if(i==12 && j==10)
            {  
              s=s+'<td class="start" ></td>'
            }
            else if(i==12 && j==40)
            {  
              s=s+'<td class=" end"></td>'
            }
            else
            { 
              let id=i*50+j 
              s=s+'<td id='+id +' ></td>'
            }
          }
          s=s+'</tr>'
          ans=ans+s
        }
        
        document.getElementById("tbl").innerHTML = ans;
        return;
    }

    $.fn.myFunction();

    $.fn.reset = function()
    {
        let i=12,j=40;
        while(i<25 && j<50 &&i>=0 &&j >=0&&!(i==12 && j==10) && arr[i][j].val!=20000 )
        {
            let previ=i,prevj=j;
            i=arr[previ][prevj].i;
            j=arr[previ][prevj].j;
            let id=i*50+j;
            $('#'+id).css({"background-color":''});
        }

      for( k=0;k<25;k++)
      {
        for( l=0;l<50;l++)
        { 
              arr[k][l].isV=false
              arr[k][l].i=0
              arr[k][l].j=0
              arr[k][l].mi=k
              arr[k][l].mj=l
              arr[k][l].val=20000
        }
      }
      return;
    }


    

    $.fn.isvalid =function(a,b)
    {
      if(!a.isV && !a.iw && a.val>b.val+1)
          return true;
      return false;
    }

    $.fn.dijkstra = function() 
    {
      var vis=[]
      arr[12][10].val=0;
      arr[12][10].i=0;
      arr[12][10].j=0;
      arr[12][10].isV=true;

      vis.push(arr[12][10]);
      while(vis.length!=0)
      {
        var temp=vis.pop();
        temp.isV=true;
        if(temp.mi+1<25 && $.fn.isvalid(arr[temp.mi+1][temp.mj],temp))
        {
            var t=arr[temp.mi+1][temp.mj]
            t.val=temp.val+1;
            t.i=temp.mi;
            t.j=temp.mj;
            vis.push(t);
        }
        if(temp.mi-1>=0 &&$.fn.isvalid(arr[temp.mi-1][temp.mj],temp))
        {
            var t=arr[temp.mi-1][temp.mj]
            t.val=temp.val+1;
            t.i=temp.mi;
            t.j=temp.mj;
            vis.push(t);
        }
        if(temp.mj+1<50 && $.fn.isvalid(arr[temp.mi][temp.mj+1],temp))
        {
            var t=arr[temp.mi][temp.mj+1]
            t.val=temp.val+1;
            t.i=temp.mi;
            t.j=temp.mj;
            vis.push(t);
        }
        if(temp.mj-1>=0 && $.fn.isvalid(arr[temp.mi][temp.mj-1],temp))
        {
            var t=arr[temp.mi][temp.mj-1]
            t.val=temp.val+1;
            t.i=temp.mi;
            t.j=temp.mj;
            vis.push(t);
        }
        vis.sort(function(a, b){
        return b.val - a.val
        })
      }


    }
    var f=false;

    $('#btn').click(function(){
      
      $.fn.reset ();
      $.fn.dijkstra();
      let i=12,j=40;
      while(i<25 && j<50 &&i>=0 &&j >=0&&!(i==12 && j==10) && arr[i][j].val!=20000 )
      {
        let previ=i,prevj=j;
        i=arr[previ][prevj].i;
        j=arr[previ][prevj].j;
        let id=i*50+j;
        $('#'+id).css({"background-color":"#FFFF00"});

      }


    })

    $('td').mousedown( function() {
      var p=$(this).closest("tr").index();
      var q=$(this).closest("td").index();
       if(!(p==12 && q==40))
       {
        if(!(p==12 && q==10))
        {
          $(this).css({"background-color":''});
          $(this).toggleClass("red-cell");
          arr[p][q].iw=!arr[p][q].iw;
          f=true;
        }
      }
    } );

    $('td').mouseenter( function() {
      if(f)
      {
        var p=$(this).closest("tr").index();
        var q=$(this).closest("td").index();
        if(!(p==12 && q==40))
       {
        if(!(p==12 && q==10))
        {
           $(this).css({"background-color":''});
          $(this).toggleClass("red-cell");
          arr[p][q].iw=!arr[p][q].iw;
        }
       }
      }
    } );

    $('td').mouseup( function() {
      f=false;
    } );

});
