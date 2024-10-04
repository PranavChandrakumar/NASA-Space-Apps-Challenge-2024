import math
import Variables 



def CalculateCartesian(Lattitude, Longitude):
    x = Variables.EarthRadius * math.cos(Lattitude) * math.cos(Longitude)
    y = Variables.EarthRadius * math.cos(Lattitude) * math.sin(Longitude)
    z = Variables.EarthRadius * math.sin(Lattitude)

    return [x,y,z] 



